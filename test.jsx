import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputMask from "react-input-mask";

const schema = z
  .object({
    nome: z.string().nonempty("Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    telefone: z
      .string()
      .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido"),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

export default function CadastroUsuario() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Usuário cadastrado:", data);
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label>Nome:</label>
          <input {...register("nome")} />
          {errors.nome && <p style={{ color: "red" }}>{errors.nome.message}</p>}
        </div>

        <div>
          <label>E-mail:</label>
          <input type="email" {...register("email")} />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Telefone:</label>
          <InputMask mask="(99) 99999-9999" {...register("telefone")}>
            {(inputProps) => <input {...inputProps} type="text" />}
          </InputMask>
          {errors.telefone && (
            <p style={{ color: "red" }}>{errors.telefone.message}</p>
          )}
        </div>

        <div>
          <label>Senha:</label>
          <input type="password" {...register("senha")} />
          {errors.senha && (
            <p style={{ color: "red" }}>{errors.senha.message}</p>
          )}
        </div>

        <div>
          <label>Confirmar senha:</label>
          <input type="password" {...register("confirmarSenha")} />
          {errors.confirmarSenha && (
            <p style={{ color: "red" }}>{errors.confirmarSenha.message}</p>
          )}
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      {isSubmitSuccessful && (
        <p style={{ color: "green", marginTop: "20px" }}>
          Cadastro realizado com sucesso!
        </p>
      )}
    </div>
  );
}
