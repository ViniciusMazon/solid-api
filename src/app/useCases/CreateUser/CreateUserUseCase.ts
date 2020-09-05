import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUserCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) { }

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already existis.');
    }

    const user = new User(data);
    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: 'Equipe do Meu App',
        email: 'equipe@meuapp.com',
      },
      subject: 'Seja bem-vindo',
      body: '<p>Você já pode fazer login em nossa plataforma</p>'
    });
  }
}
