import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { LessonInput } from './input/lesson.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
  ) {}

  async createLesson(lessonDto: LessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = lessonDto;
    const lesson = this.lessonRepo.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    return await this.lessonRepo.save(lesson);
  }

  getLesson(id: string): Promise<Lesson> {
    return this.lessonRepo.findOneBy({ id });
  }

  async getAllLessons(): Promise<Lesson[]> {
    return this.lessonRepo.find();
  }

  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOneBy({ id: lessonId });
    lesson.students = [...lesson.students, ...studentIds];
    return await this.lessonRepo.save(lesson);
  }
}
