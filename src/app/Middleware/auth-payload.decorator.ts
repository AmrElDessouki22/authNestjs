import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthPayload = createParamDecorator(
  (property: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return property ? request[property] : request.authPayload;
  },
);
