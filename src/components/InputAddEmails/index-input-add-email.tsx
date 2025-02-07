import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Section, ContainerEmail, Main } from './styled';
import { AiOutlineClose } from 'react-icons/ai';
import * as Yup from 'yup';

type TInputProps = {
  name: string;
  id: string;
  value: string | null;
  setFieldValue: (name: any, value: any) => void;
  label?: string;
};

const InputAddEmail = ({
  id,
  name,
  value,
  setFieldValue,
  label,
}: TInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string[]>([]);
  const [error, setError] = useState<any>(null);

  const emailSchema = Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório');

  useEffect(() => {
    if (value && value.length > 0) {
      setEmail(value.split(';'));
    }
  }, [value]);

  const handleDeleteEmail = (currentEmail: string) => {
    if (email.includes(currentEmail)) {
      setEmail((prevEmails) => {
        const emailIndex = prevEmails.indexOf(currentEmail);
        if (emailIndex > -1) {
          prevEmails.splice(emailIndex, 1);
        }
        return [...prevEmails];
      });
    }
  };

  const getEmail = useCallback(() => {
    const handleKeyPress = async (e: any) => {
      if (!inputRef.current) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        const newEmail = inputRef.current.value;

        try {
          await emailSchema.validate(newEmail);
          setEmail((prev) => [...prev, newEmail]);
          inputRef.current.value = '';
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            setError(err.message);
          } else {
            setError('Erro desconhecido');
          }
        }
      }
    };

    if (inputRef.current) {
      inputRef.current.addEventListener('keypress', handleKeyPress);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('keypress', handleKeyPress);
      }
    };
  }, []);

  useEffect(() => {
    setFieldValue(name, email.join(';'));
  }, [email]);

  useEffect(() => {
    getEmail();
  }, []);

  return (
    <Main>
      <label htmlFor={name}>{label}</label>
      <Section>
        {email.length > 0 &&
          email.map((data, i) => {
            return (
              <ContainerEmail key={i}>
                <p>{data}&nbsp;</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteEmail(data);
                  }}
                >
                  <AiOutlineClose />
                </button>
              </ContainerEmail>
            );
          })}
        <input
          type="text"
          ref={inputRef}
          name={name}
          id={id}
          onChange={(e) => {
            if (e.target.value === '') {
              setError('');
            }
          }}
        />
      </Section>
      <span className="error-handling">{error}</span>
    </Main>
  );
};

export default InputAddEmail;
