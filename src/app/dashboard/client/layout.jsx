import { requireRole } from '@/lib/core/session';
import React from 'react';

const ClientLayout = async({children}) => {

    await requireRole('client')
    return children
};

export default ClientLayout;