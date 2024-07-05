export class EntityNotFound extends Error {
    constructor(entity: string){
        super();
        this.name = `${entity}NotFound`
        this.message = `${entity} not found`
    }
}