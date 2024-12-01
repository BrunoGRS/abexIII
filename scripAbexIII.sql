use idchild;

create table usuario(
	IdUsuario int auto_increment primary key,
    NomeUsuario varchar(30) not null,
    emailUsuario varchar(35) not null,
    senhaUsuario varchar(20) not null
);

create table tutor(
	IdTutor int auto_increment primary key,
    NomeTutor varchar(50) not null,
    IdadeTutor tinyint,
    ContatoTutor int(11) not null,
    CpfTutor varchar(11) not null
);

create table dependente(
	IdDependente int auto_increment primary key,
    CpfDependente varchar(11) not null,
    NomeDependente varchar(50) not null,
    IdadeDependente tinyint,
	ContatoDependente int(11) not null
);

create table fichaMedica(
	IdFichaMedica int auto_increment primary key,
    IdDependente int not null,
    RemedioDependente varchar(50),
    AlergiaDependente varchar(200),
    ContatoEmergencia int(11) not null,
    TipoSanguineoDependente varchar(3) not null,
    foreign key (IdDependente) references dependente (IdDependente)
);

create table grupoTutor(
	IdGrupo int auto_increment primary key,
    IdTutor int not null,
    IdDependente int not null,
    foreign key (IdTutor) references tutor (IdTutor),
    foreign key (IdDependente) references dependente (IdDependente)
);

create table localizacao(
	IdLocalizacao int auto_increment primary key,
    Latitude int not null,
    Longitude int not null,
    DataLocalizacao datetime default current_timestamp
);

create table emergencia(
	IdEmergencia int auto_increment primary key,
    NomeEmergencia varchar(50) not null,
    ContatoEmergencia int(11) not null
);

create table Medicamentosfichamedica (
	IdMedicamento int auto_increment primary key,
    IdFichaMedica int not null,
    NomeMedicamento varchar(50) not null,
    foreign key (IdFichaMedica) references fichamedica (IdFichaMedica)
);

create table comordidadeFichaMedica (
	IdComordidade int auto_increment primary key,
    IdFichaMedica int not null,
    IdNomeComordidade varchar(50) not null,
    foreign key (IdFichaMedica) references fichamedica (IdFichaMedica)
)

