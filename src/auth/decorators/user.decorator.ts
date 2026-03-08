import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface RequestWithUser {
  user: {
    id: string;
    [key: string]: unknown;
  };
}

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
