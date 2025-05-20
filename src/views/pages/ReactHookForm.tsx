import { useState } from 'react';
import { useForm, FieldError } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// components
import Select from '@/views/components/Select';

const formRequestSchema = z.object({
  input: z.string().min(1, {message: '必填'}),
  email: z.string().min(1, {message: '必填'}).email('email 格式不正確'),
  select: z.string().nonempty('必填'),
  select_1: z.string().optional(),
  check: z.array(z.string()).min(1, { message: '必填' }),
  radio: z.string().min(1, {message: '必填'}),
  textarea: z.string().max(10, {message: '不可超過 10 字'}).optional(),
})

type FormRequest = z.infer<typeof formRequestSchema>

const ReactHookForm: React.FC = () => {
  const { register, handleSubmit, setValue, getValues, control, formState: { errors } } = useForm<FormRequest>({
    resolver: zodResolver(formRequestSchema),
    defaultValues: {
      select: '',
      check: [],
      radio: '',
    },
  });
  const [values, setValues] = useState(getValues());

  const handleInputChange = () => {
    setValues(getValues());
  }

  const handleInputClear = (name: keyof FormRequest) => {
    setValue(name, '', { shouldValidate: true });
    setValues(getValues());
  }

  const onSubmit = (data: FormRequest): void => {
    console.log('data', data);
  };

  console.log('errors', errors);
  

  return (
    <>
      <form className="bg-blue-50 rounded-[8px] p-[20px]" onSubmit={handleSubmit(onSubmit)}>
        {/* input text */}
        <div className="mb-[20px]">
          <div className="mb-[4px]">
            <label htmlFor="input" className="u-h4">input</label>
          </div>
          <div>
            <div className="u-text flex flex-(items-center justify-between) gap-[8px] border-(solid 1 gray) rounded-[4px] py-[8px] px-[10px]">
              <input type="text" id="input" placeholder="請輸入" className="w-100%" {...register('input', {
                  onChange: handleInputChange
                }
              )}
              />
              <button type="button" className={`i-material-symbols:close-small-outline-rounded flex-shrink-0 u-transition-ease ${(values['input'] && values['input'] !== '') ? 'opacity-100' : 'opacity-0'}`} onClick={() => handleInputClear('input')}></button>
            </div>
            {errors['input'] && (
              <p className="u-caption text-error mt-[4px]">{(errors['input'] as FieldError).message}</p>
            )}
            <div className="u-caption text-gray mt-[4px]">備註文字</div>
          </div>
        </div>
        {/* input email */}
        <div className="mb-[20px]">
          <div className="mb-[4px]">
            <label htmlFor="email" className="u-h4">email</label>
          </div>
          <div>
            <div className="u-text flex flex-(items-center justify-between) gap-[8px] border-(solid 1 gray) rounded-[4px] py-[8px] px-[10px]">
              <input type="email" id="email" placeholder="請輸入" className="w-100%" {...register('email', {
                  onChange: handleInputChange
                })} />
              <button type="button" className={`i-material-symbols:close-small-outline-rounded flex-shrink-0 u-transition-ease ${(values['email'] && values['email'] !== '') ? 'opacity-100' : 'opacity-0'}`} onClick={() => handleInputClear('email')}></button>
            </div>
            {errors['email'] && (
              <p className="u-caption text-error mt-[4px]">{(errors['email'] as FieldError).message}</p>
            )}
            <div className="tu-caption ext-gray mt-[4px]">備註文字</div>
          </div>
        </div>
        {/* select */}
        <div className="mb-[20px]">
          <div className="mb-[4px]">
            <label htmlFor="select" className="u-h4">select</label>
          </div>
          <div>
            <Select name={'select'} 
              control={control} 
              options={[
                { label: '蘋果', value: 'apple' },
                { label: '香蕉', value: 'banana' },
                { label: '芒果', value: 'mango' },
              ]}
            />
            {errors['select'] && (
              <p className="u-caption text-error mt-[4px]">{(errors['select'] as FieldError).message}</p>
            )}
            <div className="u-caption text-gray mt-[4px]">備註文字</div>
          </div>
        </div>
        {/* select optional */}
        <div className="mb-[20px]">
          <div className="mb-[4px]">
            <label htmlFor="select_1" className="u-h4">select</label>
          </div>
          <div>
            <Select name={'select_1'} 
              // control={control} 
              options={[
                { label: '蘋果', value: 'apple' },
                { label: '香蕉', value: 'banana' },
                { label: '芒果', value: 'mango' },
              ]}
            />
            {errors['select_1'] && (
              <p className="u-caption text-error mt-[4px]">{(errors['select_1'] as FieldError).message}</p>
            )}
            <div className="u-caption text-gray mt-[4px]">備註文字</div>
          </div>
        </div>
        {/* checkbox */}
        <div className="mb-[20px]">
          <div className="mb-[4px]">
            <div className="u-h4">checkbox</div>
          </div>
          <div>
            <div className="flex flex-(items-center) gap-[10px]">
              <div className="u-text relative flex flex-(items-center justify-between) gap-[4px]">
                <input type="checkbox" id="check_0" className="peer w-100% h-100% absolute top-0 left-0 z-10 opacity-0" {...register('check', {
                  onChange: (e) => {
                    const currentValue = getValues('check') || [];
                    if (e.target.checked) {
                      setValue('check', [...currentValue, e.target.value], { shouldValidate: true });
                    } else {
                      setValue('check', currentValue.filter((val: string) => val !== e.target.value), { shouldValidate: true });
                    }
                  }
                })} value="check_0" />
                <div className="relative w-[20px] h-[20px] border-(solid 1 gray) rounded-[4px] after:(content-['✔'] text-blue-500 u-absolute-center opacity-0) peer-checked:(border-blue-500) peer-checked:after:(opacity-100)"></div>
                <label htmlFor="check_0">選項</label>
              </div>
              <div className="u-text relative flex flex-(items-center justify-between) gap-4">
                <input type="checkbox" id="check_1" className="peer w-100% h-100% absolute top-0 left-0 z-10 opacity-0" {...register('check', {
                  onChange: (e) => {
                    const currentValue = getValues('check') || [];
                    if (e.target.checked) {
                      setValue('check', [...currentValue, e.target.value], { shouldValidate: true });
                    } else {
                      setValue('check', currentValue.filter((val: string) => val !== e.target.value), { shouldValidate: true });
                    }
                  }
                })} value="check_1" />
                <div className="relative w-[20px] h-[20px] border-(solid 1 gray) rounded-[4px] after:(content-['✔'] text-blue-500 u-absolute-center opacity-0) peer-checked:(border-blue-500) peer-checked:after:(opacity-100)"></div>
                <label htmlFor="check_1">選項</label>
              </div>
            </div>
            {errors['check'] && (
              <p className="u-caption text-error mt-[4px]">{(errors['check'] as FieldError).message}</p>
            )}
            <div className="u-caption text-gray mt-[4px]">備註文字</div>
          </div>
        </div>
        {/* radio */}
        <div className="mb-[20px]">
          <div className="mb-[4px]">
            <div className="u-h4">radio</div>
          </div>
          <div>
            <div className="flex flex-(items-center) gap-[10px]">
              <div className="u-text relative flex flex-(items-center justify-between) gap-4">
                <input type="radio" id="radio_0" className="peer w-100% h-100% absolute top-0 left-0 z-10 opacity-0" {...register('radio')} value="Y" />
                <div className="w-[20px] h-[20px] relative border-(solid 1 gray) rounded-[50px] after:(content-[''] w-[10px] h-[10px] rounded-[50px] bg-blue-500 u-absolute-center opacity-0) peer-checked:(border-blue-500) peer-checked:after:(opacity-100)"></div>
                <label htmlFor="radio_0">選項</label>
              </div>
              <div className="u-text relative flex flex-(items-center justify-between) gap-4">
                <input type="radio" id="radio_1" className="peer w-100% h-100% absolute top-0 left-0 z-10 opacity-0" {...register('radio')} value="N" />
                <div className="w-[20px] h-[20px] relative border-(solid 1 gray) rounded-[50px] after:(content-[''] w-[10px] h-[10px] rounded-[50px] bg-blue-500 u-absolute-center opacity-0) peer-checked:(border-blue-500) peer-checked:after:(opacity-100)"></div>
                <label htmlFor="radio_1">選項</label>
              </div>
            </div>
            {errors['radio'] && (
              <p className="u-caption text-error mt-[4px]">{(errors['radio'] as FieldError).message}</p>
            )}
            <div className="u-caption text-gray mt-[4px]">備註文字</div>
          </div>
        </div>
        {/* textarea optional */}
        <div className="mb-[20px]">
          <div className="mb-[4px]">
            <label htmlFor="textarea" className="u-h4">textarea</label>
          </div>
          <div>
            <div className="u-text flex flex-(items-center justify-between) gap-[8px] border-(solid 1 gray) rounded-[4px] py-[8px] px-[10px]">
              <textarea id="textarea" cols={30} rows={10} maxLength={1000} placeholder="請輸入" className="w-100%" {...register('textarea')} onChange={(e) => setValue('textarea', e.target.value, { shouldValidate: true })}></textarea>
            </div>
            {errors['textarea'] && (
              <p className="u-caption text-error mt-[4px]">{(errors['textarea'] as FieldError).message}</p>
            )}
            <div className="u-caption text-gray mt-[4px]">備註文字</div>
          </div>
        </div>
        <button type="submit" className="bg-blue text-white rounded-[4px] p-[8px]">送出</button>
      </form>
    </>
  );
};

export default ReactHookForm;
