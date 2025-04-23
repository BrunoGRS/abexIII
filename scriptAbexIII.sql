-- Tabela de usuários (sem alterações)
CREATE TABLE usuario(
	IdUsuario INT AUTO_INCREMENT PRIMARY KEY,
    NomeUsuario VARCHAR(30) NOT NULL,
    emailUsuario VARCHAR(35) NOT NULL,
    senhaUsuario VARCHAR(20) NOT NULL
);

-- Tabela de tutores (substituindo IdadeTutor por DataNascimentoTutor)
CREATE TABLE tutor(
	IdTutor INT AUTO_INCREMENT PRIMARY KEY,
    NomeTutor VARCHAR(50) NOT NULL,
    DataNascimentoTutor DATE,  -- Substituindo Idade por Data de Nascimento
    ContatoTutor INT(11) NOT NULL,
    CpfTutor VARCHAR(11) NOT NULL
);

-- Tabela de dependentes (substituindo IdadeDependente por DataNascimentoDependente)
CREATE TABLE dependente(
	IdDependente INT AUTO_INCREMENT PRIMARY KEY,
    CpfDependente VARCHAR(11) NOT NULL,
    NomeDependente VARCHAR(50) NOT NULL,
    DataNascimentoDependente DATE,  -- Substituindo Idade por Data de Nascimento
	ContatoDependente INT(11) NOT NULL
);

-- Tabela de ficha médica (sem alteração além das que já foram feitas)
CREATE TABLE fichaMedica(
	IdFichaMedica INT AUTO_INCREMENT PRIMARY KEY,
    IdDependente INT NOT NULL,
    RemedioDependente VARCHAR(50),
    AlergiaDependente VARCHAR(200),
    ContatoEmergencia INT(11) NOT NULL,
    TipoSanguineoDependente VARCHAR(3) NOT NULL,
    FOREIGN KEY (IdDependente)
        REFERENCES dependente (IdDependente)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Tabela de grupos de tutores (sem alteração além das que já foram feitas)
CREATE TABLE grupoTutor(
	IdGrupo INT AUTO_INCREMENT PRIMARY KEY,
    IdTutor INT NOT NULL,
    IdDependente INT NOT NULL,
    FOREIGN KEY (IdTutor)
        REFERENCES tutor (IdTutor)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (IdDependente)
        REFERENCES dependente (IdDependente)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Tabela de localização (sem alterações)
CREATE TABLE localizacao(
	IdLocalizacao INT AUTO_INCREMENT PRIMARY KEY,
    Latitude INT NOT NULL,
    Longitude INT NOT NULL
);

-- Tabela de emergências (sem alterações)
CREATE TABLE emergencia(
	IdEmergencia INT AUTO_INCREMENT PRIMARY KEY,
    NomeEmergencia VARCHAR(50) NOT NULL,
    ContatoEmergencia INT(11) NOT NULL
);
