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
  const firstRender = useRef<boolean>(true);

  const [email, setEmail] = useState<string[]>([]);
  const [error, setError] = useState<any>(null);

  const emailSchema = Yup.string().email('Email inválido');

  useEffect(() => {
    if (value && value.length > 0) {
      setEmail(value.split(';'));
    }
  }, [value]);

  const validateEmailBeforeInsert = async () => {
    if (inputRef.current) {
      const newEmail = inputRef.current.value.trim();

      if (newEmail.length < 1) return;
      try {
        await emailSchema.validate(newEmail);
        setEmail((prev) => [...prev, newEmail]);
        inputRef.current.value = '';
        setError([]);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setError(err.message);
        } else {
          setError('Erro desconhecido');
        }
      }
    }
  };

  const handleDeleteEmail = (currentEmail: string) => {
    if (email.includes(currentEmail)) {
      setEmail((prevEmails) => {
        const emailIndex = prevEmails.indexOf(currentEmail);
        if (emailIndex > -1) {
          prevEmails.splice(emailIndex, 1);
        }
        setError([]);
        return [...prevEmails];
      });
    }
  };

  const getEmail = useCallback(() => {
    const handleKeyPress = async (e: any) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        validateEmailBeforeInsert();
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

  useEffect(() => {
    if (inputRef.current) {
      if (firstRender.current) {
        inputRef.current.readOnly = true;
        firstRender.current = false;
      }

      inputRef.current.readOnly = false;
    }
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
          autoComplete="off"
          ref={inputRef}
          name={name}
          id={id}
          onFocus={() => {
            setError([]);
          }}
          onBlur={async () => validateEmailBeforeInsert()}
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
