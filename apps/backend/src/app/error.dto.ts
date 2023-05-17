import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export interface ResponseError {
  statusCode: number;
  error: string;
  message?: string[];
}

export class ErrorDto implements ResponseError {
  @ApiProperty({ examples: [500, 400, 401] })
  public readonly statusCode!: number;

  @ApiProperty({
    examples: ['Internal Server Error', 'Bad Request', 'Unauthorized'],
  })
  public readonly error!: string;

  @ApiPropertyOptional()
  public readonly message?: string[];
}
