import { ContentContainer, PageContainer } from '../components/common/Layout';
import BannedGroupsList from '../components/superadmin/BannedGroupsList';
import NonBannedGroupsList from '../components/superadmin/NonBannedGroupsList';

function SuperAdmin() {
  return (
    <PageContainer>
      <ContentContainer>
        <NonBannedGroupsList />
        <BannedGroupsList />
      </ContentContainer>
    </PageContainer>
  );
}

export default SuperAdmin;
