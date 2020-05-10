import { TasksService } from './tasks.service';
import { TaskRepository } from '../repository/task.repository';
import { Test } from '@nestjs/testing';
import { GetTasksFilterDto } from '../controller/dto/get-tasks-filter.dto';
import { TaskStatus } from '../entity/task-status.enum';


const mockUser = { username: 'Test username' };
const mockTaskRepository = () => ({
    getTasks: jest.fn(),
  })
;


describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue');

      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      const filter: GetTasksFilterDto = {
        status: TaskStatus.OPEN,
        search: 'Some search query',
      };
      const result = await tasksService.getTasks(filter, mockUser);
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });
});
