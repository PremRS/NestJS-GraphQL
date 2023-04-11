import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class StudentInput {
  @Field()
  @MinLength(1)
  firstName: string;

  @Field()
  @MinLength(1)
  lastName: string;
}
