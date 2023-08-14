import useSWR from 'swr';
import { Stack, Typography, styled } from '@mui/material';
import ModeratorService from '../../api/moderator';
import BannedReasons from '../../config/variables';

const StyledContainer = styled(Stack)({
  backgroundColor: 'yellow',
});
interface IProps {
  groupname: string;
  postID: number;
}
function Reports(props: IProps) {
  const { groupname, postID } = props;
  const { data, error, isLoading } = FetchPostReports(groupname, postID);
  return (
    data &&
    data?.length > 0 && (
      <StyledContainer>
        <Typography variant="h5">Người dùng báo cáo</Typography>
        {data?.map((r) => {
          const { bannedReason, _count: count } = r;
          const reason = BannedReasons.find((b) => b.code === bannedReason);
          return (
            <Typography key={reason?.code} variant="body1">{`${count}: ${
              reason?.vi || 'key not found'
            }`}</Typography>
          );
        })}
      </StyledContainer>
    )
  );
}

function FetchPostReports(groupname: string, postID: number) {
  const { data, error, isLoading } = useSWR(
    `/${groupname}/post/${postID}/reports}`,
    () => ModeratorService.fetchPostReports(groupname, postID)
  );

  return { data, error, isLoading };
}

export default Reports;
