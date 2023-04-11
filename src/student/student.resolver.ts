import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentInput } from './input/student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((returns) => StudentType)
  async student(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Query((returns) => [StudentType])
  async allStudents() {
    return this.studentService.getAllStudents();
  }

  @Mutation((returns) => StudentType)
  createStudent(@Args('studentInput') studentInput: StudentInput) {
    return this.studentService.createStudent(studentInput);
  }
}
