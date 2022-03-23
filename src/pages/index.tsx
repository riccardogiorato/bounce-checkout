import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BookingPlaceAndBags } from "../components/BookingPlaceAndBags";
import { BottomControls } from "../components/BottomControls";
import { FormSection } from "../components/FormSection";
import { Input } from "../components/Input";
import { BookingProcessingOverlay } from "../components/BookingProcessingOverlay";

const MIN_AMOUNT_OF_RETRIES = 1;

enum Steps {
  "bags",
  "person",
  "card",
}
const StepsAmount = Object.keys(Steps).length;

const pricePerBag = 5.9;

const Home: NextPage = () => {
  const router = useRouter();
  const {
    place = "Bucharest",
    bags = 1,
    name = "",
    email = "",
  }: {
    place?: string;
    bags?: number;
    name?: string;
    email?: string;
  } = router.query;

  const amountOfBags = Number(bags);

  const [step, setStep] = useState<Steps>(Steps.bags);

  const changeRouterKey = (key: string) => {
    return (newValue: string | number) => {
      router.replace({
        pathname: "/",
        query: {
          ...router.query,
          [key]: newValue,
        },
      });
    };
  };

  const [card, setCard] = useState("");
  const changeCard = (newValue: string) => {
    setCard(newValue);
  };

  const [paymentStatus, setPaymentStatus] = useState<
    "processing" | "failed" | "success"
  >();

  const [paymentRetries, setPaymentRetries] = useState(0);
  const processPayment = () => {
    setPaymentStatus("processing");
    if (paymentRetries < MIN_AMOUNT_OF_RETRIES) {
      setTimeout(() => {
        setPaymentStatus("failed");
        setPaymentRetries(paymentRetries + 1);
      }, 3000);
    } else {
      setPaymentStatus("success");
    }
  };

  useEffect(() => {
    if (paymentStatus === "success") {
      router.push({
        pathname: "/placed",
      });
    }
  }, [paymentStatus, router]);

  const formSteps = [
    {
      title: "Personal Details",
      stepValue: Steps.person,
      inputs: [
        {
          label: "Name",
          value: name,
          onChange: changeRouterKey("name"),
        },
        {
          label: "Email",
          value: email,
          onChange: changeRouterKey("email"),
        },
      ],
    },
    {
      title: "Payment Information",
      stepValue: Steps.card,
      inputs: [
        {
          label: "Card Details",
          value: card,
          onChange: changeCard,
        },
      ],
    },
  ];

  const mainButtonDisabled = formSteps
    .find((formStep) => formStep.stepValue === step)
    ?.inputs.some((input) => !input.value);

  const mainButtonError = paymentStatus === "failed";

  const [isCompletedSteps, setIsCompletedSteps] = useState<{
    [key in Steps]?: boolean;
  }>();
  const goNextStep = () => {
    if (step < StepsAmount) {
      setIsCompletedSteps({
        ...isCompletedSteps,
        [step]: true,
      });
      setStep(step + 1);
    }
  };

  return (
    <>
      {paymentStatus === "processing" && <BookingProcessingOverlay />}
      <div className="w-full max-w-md h-full bg-white mx-auto flex flex-col">
        <BookingPlaceAndBags
          place={place}
          bags={amountOfBags}
          onBagsChange={changeRouterKey("bags")}
        />
        {formSteps.map(({ title, stepValue, inputs }) => (
          <FormSection
            key={stepValue}
            title={title}
            status={
              step >= stepValue
                ? isCompletedSteps && isCompletedSteps[stepValue]
                  ? "completed"
                  : "visible"
                : "hidden"
            }
            onChangeClick={() => {
              setIsCompletedSteps({
                ...isCompletedSteps,
                [stepValue]: false,
              });
            }}
          >
            {inputs.map(({ label, value, onChange }) => (
              <Input
                key={label}
                label={label}
                value={value}
                onChange={onChange}
              />
            ))}
          </FormSection>
        ))}

        <BottomControls bagsAmount={amountOfBags} bagSinglePrice={pricePerBag}>
          <button
            className={`rounded flex items-cente m-2 px-4 py-4 text-white ${
              mainButtonError
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            } ${mainButtonDisabled && "opacity-50"}`}
            onClick={step < Steps.card ? goNextStep : processPayment}
            disabled={mainButtonDisabled}
          >
            {step < Steps.card
              ? "Next"
              : paymentStatus === "failed"
              ? "Retry"
              : paymentStatus === "processing"
              ? "..."
              : "Book"}
          </button>
        </BottomControls>
      </div>
    </>
  );
};

export default Home;
