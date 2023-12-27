
import * as jwt from "jsonwebtoken";
import configs from 'src/Utils/environment/config';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    
    try {
        const wholeToken = req.headers['Authorization'] as string || req.headers['authorization'];
        if (!wholeToken) throw new Error("can't find token");

        const typeAndToken = wholeToken.split(' ');
        if (!typeAndToken) throw new Error("can't verify token");
        // if(typeAndToken[0] != 'Bearer') throw new Error('unauthorized')
        let token = typeAndToken[1];
        if (!token) throw new Error("can't get token");
        const tokenPayload = jwt.verify(token, configs.JWT_SECRET) as jwt.JwtPayload;
        (req as any).authPayload = {
            ...tokenPayload
        }
        return true;
    } catch (error) {        
        return false;
    }
  }
}

