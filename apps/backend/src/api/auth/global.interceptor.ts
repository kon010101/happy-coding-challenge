import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<unknown> {
    /* Filter all properties with the decorator 'Exclude()' from the response,
      if users role is not 'admin' */
    return next.handle().pipe(map((data) => instanceToPlain(data)));
  }
}
