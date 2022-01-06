**RF** => Requisitos funcionais
**RNF** => Requisitos não funcionais
**RN** => Regras de negocio



# Cadastro de Carros

**RF**
Deve se ser possível cadastrar uma novo carro

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
O usuário responsável pelo cadastro de carros deve ser um usuário administrador.
O carro deve ser cadastrado com disponibilidade por padrão.

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pela nome da marca.
Deve ser possível listar todos os carros disponiveis pelo nome do carro.

**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro de carros deve ser um usuário administrador.


# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro
Deve ser possível listar todos os carros

**RNF**
Utilizar o multer para upload de arquivos

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro de carros deve ser um usuário administrador.

# Exclusão de imagens

**RF**
Deve ser possivel excluir imagem de um carro

**RN**
Não sera aceito carros inexistentes
O usuário devera estar autenticado.
O usuário responsável pelo cadastro de carros deve ser um usuário administrador.


# Aluguel de Carro

**RF**
Deve ser possivel cadastrar um aluguel

**RN**
O aluguel deve ter duração minima de 24 horas.
Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuário.
Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro.
