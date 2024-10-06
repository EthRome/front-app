interface IconButtonProps {
  handleOnClick?: () => void;
  icon: any;
  label?: string;
}

export const IconButton = ({ handleOnClick, icon, label }: IconButtonProps) => {
  return (
    <div className='flex flex-col'>
      <button onClick={handleOnClick} className='flex justify-center items-center w-[64px] h-[64px] bg-gray rounded-[16px]'>
        <div className='w-[26px] h-[26px] icon-stroke'>{icon}</div>
      </button>
      <p className='text-center mt-1'>{label}</p>
    </div>
  );
};
