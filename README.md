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
O usuário deve estar logado na aplicação
Apos realizar o aluguel de um carro, o mesmo deverá ficar indisponivel.


# Devolução de um carro

**RF**
Deve ser possivel devolver um carro

**RN**
Se o carro for devolvido com menos de 24 horas, sera cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outra aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser pagado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado no valor total do aluguel. 

# Listar alugueis de um Usuário

**RF**
Deve swer possivel listar os aluguei de um usuário

**RN**
O usuário deverá estar autenticado.


# Recuperar Senha

**RF**
Deve ser possivel recuperar a senha utilizando o email.
O usuário deverá receber um e-mail com o passo a passo da recuperação da senha.
o usuário dederá conseguir colocar uma nova senha.

**RN**
O usuário precisa informar uma nova senha.
O link para a recuperação da senha deve expirar em 3 horas.
