import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsUUID, MinLength } from 'class-validator';

@InputType()
export class LessonInput {
  @MinLength(1)
  @Field()
  name: string;

  @Field()
  @IsDateString()
  startDate: string;

  @Field()
  @IsDateString()
  endDate: string;

  @Field((type) => [ID], { defaultValue: [] })
  @IsUUID('4', { each: true })
  students: string[];
}
