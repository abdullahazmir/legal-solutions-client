import { getLawFirms } from '@/lib/api/lawfirms';
import LawFirmTable from './LawFirmTable';

const AdminLawFirmsPage = async () => {
    const lawFirms = await getLawFirms();
    return (
        <div className="p-6">
            <LawFirmTable lawFirms={lawFirms} />
        </div>
    );
};

export default AdminLawFirmsPage;