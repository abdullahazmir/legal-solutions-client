import { getLawFirms } from '@/lib/api/lawfirms';
import LawFirmTable from './LawFirmTable';
import { h1 } from 'motion/react-client';

const AdminLawFirmsPage = async () => {
    const lawFirms = await getLawFirms();
    return (
        <div className="p-6">
            <h1>law firm</h1>
            <LawFirmTable lawFirms={lawFirms} />
        </div>
    );
};

export default AdminLawFirmsPage;