import { getApplicationsByClient } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import ClientApplicationsTable from './ClientApplicationsTable';

const ClientApplicationPage = async () => {
    const user = await getUserSession();
    const cases = await getApplicationsByClient(user.id);

    return (
        <div className="p-6">
            <ClientApplicationsTable cases={cases} />
        </div>
    );
};

export default ClientApplicationPage;