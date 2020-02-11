import {AuthDirective, authTypeDef} from './auth';
import {ProtectDirective, protectTypeDef} from './protect';


export const schemaDirectives = {
  auth: AuthDirective,
  protect: ProtectDirective
}

export const directivesTypeDef = [
  authTypeDef,
  protectTypeDef
]
