import {
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import config from 'src/commons/configs/app.config'
import { ACTIVE_STATUS, IS_PUBLIC_KEY_PERMISSION } from 'src/commons/constants';
import { Logger } from '@nestjs/common';
import { UnauthenticatedResponse } from 'src/shares/utils';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            //Check decorator Public of route
            const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY_PERMISSION, [
                context.getHandler(),
                context.getClass(),
            ]);
            if (isPublic) {
                return true;
            }

            //Case not publice route
            const request = context.switchToHttp().getRequest();
            const token = this.extractTokenFromHeader(request);
            if (!token) {
                throw 'TOKEN not found';
            }
            try {
                const userPayload = await this.jwtService.verifyAsync(
                    token,
                    {
                        secret: config().SERVER.JWT_KEY
                    }
                );

                if (!userPayload.userId || !userPayload.email) {
                    throw 'User info missing in token'
                }

                request['user'] = userPayload;
            } catch (err) {
                throw err.message || JSON.stringify(err);
            }
            
            return true;
        } catch (err) {
            Logger.error(`JWT Guard error: ${err.message || JSON.stringify(err)}`)
            throw UnauthenticatedResponse(err.message || JSON.stringify(err))
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}