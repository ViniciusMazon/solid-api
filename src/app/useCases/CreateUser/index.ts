import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUserCase } from "./CreateUserUseCase";

const mailtrapMailProvider = new MailtrapMailProvider();
const postgresUsersRepository = new PostgresUserRepository();

const createUserUseCase = new CreateUserUserCase(
  postgresUsersRepository,
  mailtrapMailProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController }
