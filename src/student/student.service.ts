import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, In, Repository } from 'typeorm';
import { StudentInput } from './input/student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studRepo: Repository<Student>,
  ) {}

  async getAllStudents(): Promise<Student[]> {
    return this.studRepo.find();
  }

  async getStudent(id: string): Promise<Student> {
    return this.studRepo.findOneBy({ id });
  }

  async createStudent(studentInput: StudentInput): Promise<Student> {
    const { firstName, lastName } = studentInput;

    const student = this.studRepo.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return this.studRepo.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    console.log('Ids' + [...studentIds]);
    const students: Student[] = [];
    for (let i = 0; i < studentIds.length; i++) {
      const found: Student = await this.studRepo.findOneBy({
        id: studentIds[i],
      });
      if (found) {
        students.push(found);
      }
    }

    return students;
  }
}
