import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY_PERMISSION } from 'src/commons/constants';

export const Public = () => SetMetadata(IS_PUBLIC_KEY_PERMISSION, true);