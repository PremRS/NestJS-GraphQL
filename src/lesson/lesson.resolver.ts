import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';
import { LessonInput } from './input/lesson.input';
import { AssignLessonInput } from './input/assign-lesson.input';
import { StudentService } from 'src/student/student.service';
import { Lesson } from './lesson.entity';
import { StudentType } from 'src/student/student.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query((returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query((returns) => [LessonType])
  allLessons() {
    return this.lessonService.getAllLessons();
  }

  @Mutation((returns) => LessonType)
  createLesson(@Args('lessonInput') lessonInput: LessonInput) {
    return this.lessonService.createLesson(lessonInput);
  }

  @Mutation((returns) => LessonType)
  assignStudentsToLesson(
    @Args('assignLessonInput') assignLessonInput: AssignLessonInput,
  ) {
    const { lessonId, studentIds } = assignLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    const students = await this.studentService.getManyStudents(lesson.students);
    console.log('Students' + JSON.stringify(students));
    return students;
  }
}
