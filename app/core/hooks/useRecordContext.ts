import { useContext } from 'react';
import { RecordContext } from '@contexts/RecordContext';

const useRecordContext = () => {
    const recordContext = useContext(RecordContext);

    if (!recordContext) {
        throw new Error(
            'useRecordContext must be used within a RecordContextProvider'
        );
    }

    return recordContext;
}

export default useRecordContext;