import { useController, Control } from "react-hook-form";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> {
    name: string;
    control: Control<any>;
    isTextArea?: boolean;
}

const InputField = ({ name, control, isTextArea, ...props }: InputFieldProps) => {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    return (
        <div className="flex flex-col justify-center space-y-2 flex-1">
            {isTextArea ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...props}
                    ref={ref}
                    className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                    spellCheck="false"
                />
            ) : (
                <input
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    spellCheck="false"
                    {...props}
                    ref={ref}
                    className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                />
            )}
            {!!error && <p className="text-sm text-red-600 dark:text-red-500">{error.message}</p>}
        </div>
    );
};

export default InputField;
