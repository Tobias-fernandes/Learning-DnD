// import React, { useState } from 'react';
// import { InputValueContext } from '@/context/InputValueContext';

// type InputValueProviderProps = {
//     children: React.ReactNode;
// };

// export const InputValueProvider: React.FC<InputValueProviderProps> = ({ children }) => {
//     const [inputValue, setInputValue] = useState<string | null>(null);

//     return (
//         <InputValueContext.Provider value={{ inputValue, setInputValue }}>
//             {children}
//         </InputValueContext.Provider>
//     );
// };