"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Modal({ children }) {
  let overlay;
  let wrapper;
  const router = useRouter();

  const onDismiss = () => {
    router.push("/board");
  };

  const handleClick = (e) => {
    if (e.target === e.currentTarget && onDismiss) {
      onDismiss();
    }
  };

  return (
    <div
      className="modal"
      onClick={(e) => {
        overlay = e.target;
        handleClick(e);
      }}
    >
      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-4 right-8"
      >
        <Image src="/close.svg" width={17} height={17} alt="close" />
      </button>

      <div
        className="modal_wrapper"
        ref={(el) => {
          wrapper = el;
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
