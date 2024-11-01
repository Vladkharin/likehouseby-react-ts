import { MaskedInput, createDefaultMaskGenerator } from "react-hook-mask";
import { typeInputsError } from "../../../../../typesAndIntefaces";
import React, { useState } from "react";
import { FORM_STATUS_MESSAGE } from "../../data";
import styles from "./Form.module.css";
import { sendShare } from "../../../../../../API/routes";

const maskGenerator = createDefaultMaskGenerator("+7 (999) 999-99-99");

export function Form({ slide }: { slide: number }) {
  const [inputPhoneValue, setInputPhoneValue] = useState<string>("");
  const [fetchStatus, setFetchStatus] = useState<string>("");
  const [inputsError, setInputsError] = useState<typeInputsError>({
    inputName: "",
    inputPhone: "",
  });

  return (
    <div className={styles.form}>
      <div className={styles.header}>Оставьте заявку</div>
      <form onSubmit={(event) => postData(event, setInputsError, inputsError, setFetchStatus, slide, setInputPhoneValue)}>
        <input
          className={`${styles.required} ${inputsError.inputName != "" ? styles.error : ""}`}
          name="user_name"
          type="text"
          placeholder="Ваше имя"
          onChange={() => {
            setInputsError({
              inputName: "",
              inputPhone: "",
            });
            setFetchStatus("");
          }}
        />
        <MaskedInput
          maskGenerator={maskGenerator}
          className={`${styles.required} ${inputsError.inputPhone != "" ? styles.error : ""}`}
          value={inputPhoneValue}
          type="tel"
          name="user_phone"
          placeholder="Телефон"
          onChange={() => {
            setInputPhoneValue;
            setInputsError({
              inputName: "",
              inputPhone: "",
            });
            setFetchStatus("");
          }}
        />
        <button type="submit">
          <div className={fetchStatus === "Загрузка..." ? `${styles.loader} ${styles.block}` : ` ${styles.loader} ${styles.none}`}></div>
          <div className={fetchStatus === "Загрузка..." ? styles.none : styles.block}>Оставить заявку</div>
        </button>
        <p>Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности</p>
        <div
          className={`${styles.error_text} ${styles.position_error_first_input} ${
            inputsError.inputName == "Обязательное поле" ? styles.show : styles.hide
          }`}
        >
          Обязательное поле
        </div>
        <div
          className={`${styles.error_text} ${styles.position_error_first_input} ${
            inputsError.inputName == "Слишком длинное значение" ? styles.show : styles.hide
          }`}
        >
          Слишком длинное значение
        </div>
        <div
          className={`${styles.error_text} ${styles.position_error_second_input} ${
            inputsError.inputPhone == "Обязательное поле" ? styles.show : styles.hide
          }`}
        >
          Обязательное поле
        </div>
        <div
          className={`${styles.error_text} ${styles.position_error_second_input} ${
            inputsError.inputPhone == "Слишком короткое значение" ? styles.show : styles.hide
          }`}
        >
          Слишком короткое значение
        </div>
      </form>
      <div
        className={` ${styles.modal}
          ${fetchStatus === "Спасибо! Скоро мы с вами свяжемся" || fetchStatus === "Что-то пошло не так..." ? "" : styles.none}
        `}
      >
        <div className={styles.modal_wrapper}>
          <img src="./icons/crestikBlack.svg" alt="" className={styles.modal_btn_close} onClick={() => setFetchStatus("")} />
          <div className={fetchStatus === "Спасибо! Скоро мы с вами свяжемся" ? styles.complete : styles.failure}></div>
          <div className={styles.modal_text}>{fetchStatus}</div>
        </div>
      </div>
    </div>
  );
}

async function postData(
  event: React.FormEvent<HTMLFormElement>,
  setInputsError: React.Dispatch<React.SetStateAction<typeInputsError>>,
  inputsError: typeInputsError,
  setFetchStatus: React.Dispatch<React.SetStateAction<string>>,
  slide: number,
  setInputPhoneValue: React.Dispatch<React.SetStateAction<string>>
) {
  event.preventDefault();

  const form = event.nativeEvent.target as HTMLFormElement;

  const error = formValidate(form, setInputsError, inputsError, setFetchStatus);

  setFetchStatus(FORM_STATUS_MESSAGE.loading);

  if (error === 0) {
    const formData = new FormData(form);

    let choice = "";

    if (slide == 0) {
      choice = "Кредит";
    }

    formData.set("choice", choice);

    const user_name = formData.get("user_name") as string;

    const object = {
      first_name: user_name,
      choice: choice,
      telephone: formData.get("user_phone"),
      country: "by",
    };

    const response = await sendShare(JSON.stringify(object));

    form.reset();
    setInputPhoneValue("");

    if (response.success) {
      setFetchStatus(FORM_STATUS_MESSAGE.success);
    } else {
      setFetchStatus(FORM_STATUS_MESSAGE.failure);
    }
  } else {
    setFetchStatus("");
  }
}

function formValidate(
  form: HTMLFormElement,
  setInputsError: React.Dispatch<React.SetStateAction<typeInputsError>>,
  inputsError: typeInputsError,
  setFetchStatus: React.Dispatch<React.SetStateAction<string>>
) {
  let error = 0;

  const formReq = [form.childNodes[0], form.childNodes[1]];

  formRemoveError(form.childNodes[1] as HTMLInputElement, setInputsError, inputsError);
  formRemoveError(form.childNodes[0] as HTMLInputElement, setInputsError, inputsError);

  let obj: typeInputsError = {
    inputName: "",
    inputPhone: "",
  };

  for (let index = 0; index < formReq.length; index++) {
    const input = formReq[index] as HTMLInputElement;

    if (input.name === "user_name") {
      if (input.value.length > 25) {
        obj = { ...obj, inputName: "Слишком длинное значение" };
        error++;
      }

      if (input.value.trim() === "") {
        obj = { ...obj, inputName: "Обязательное поле" };
        error++;
      }
    }

    if (input.name === "user_phone") {
      if (input.value === "") {
        obj = { ...obj, inputPhone: "Обязательное поле" };
        error++;
      }

      if (input.value.length < 15 && input.value.length > 0) {
        obj = { ...obj, inputPhone: "Слишком короткое значение" };
        error++;
      }
    }
  }
  setFetchStatus("");
  setInputsError(obj);

  return error;
}

function formRemoveError(
  input: HTMLInputElement,
  setInputsError: React.Dispatch<React.SetStateAction<typeInputsError>>,
  inputsError: typeInputsError
) {
  if (input.name === "user_phone") {
    setInputsError({ ...inputsError, inputPhone: "" });
  } else if (input.name === "user_name") {
    setInputsError({ ...inputsError, inputName: "" });
  }
}
