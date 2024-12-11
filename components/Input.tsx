import { useToggleState } from "@/hooks/useToggleState";
import { inputClassName } from "@/utils/input-class-names";
import { Eye, EyeClosed } from "lucide-react";

interface IInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type?: string;
  error?: string;
  isPassword?: boolean;
}

export const Input: React.FC<IInput> = ({
  error,
  type = "text",
  isPassword = false,
  ...props
}) => {
  const [isHidden, setIsHidden] = useToggleState(true);

  return (
    <div className='flex flex-col gap-y-2'>
      {!isPassword && (
        <>
          <input type={type} className={inputClassName} {...props} />
          {!!error && (
            <p className='text-red-400 text-xs font-semibold capitalize'>
              {error}
            </p>
          )}
        </>
      )}

      {isPassword && (
        <div className='relative'>
          {" "}
          <input
            type={isHidden ? "password" : "text"}
            className='w-full border-none border-b-[1px] pb-2 pr-1 border-transparent bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] bg-no-repeat bg-[length:100%_2px] bg-bottom focus:outline-none placeholder:text-xs mb-2'
            {...props}
          />{" "}
          <button
            type='button'
            onClick={(event) => {
              event.preventDefault();
              setIsHidden();
            }}
            className='absolute top-1/2 left-2 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800'
          >
            {isHidden ? (
              <EyeClosed className='w-4 h-4 mb-2' />
            ) : (
              <Eye className='w-4 h-4 mb-2' />
            )}
          </button>
          {!!error && (
            <p className='text-red-400 text-xs font-semibold capitalize'>
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
