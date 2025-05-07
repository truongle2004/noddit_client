import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import useActionStore from '@/store/actionStore'
import { ACTION } from '@/constant'
import CreateNewPost from '@/components/CreateNewPost'
import RecentPost from '@/components/RecentPost'
import ListCard from '@/components/ListCard'
import Drawer from '@/components/Drawer/Drawer'
import useDashboardStore from '@/store/dashboardStore'
import ModalCreateCommunity from '@/components/ModalCreateCommunity/ModalCreateCommunity'

const DashboardPage = () => {
  const { action } = useActionStore()
  const { openModalCreateCommunity } = useDashboardStore()

  return (
    <>
      {openModalCreateCommunity && <ModalCreateCommunity />}
      <Drawer>
        <Stack direction="row" spacing={2}>
          {action === ACTION.CREATE_NEW_POST && <CreateNewPost />}
          {action === ACTION.SHOW_DEFAULT_PAGE && (
            <>
              <Box flex={2}>
                <ListCard />
              </Box>
              <Box flex={1}>
                <RecentPost />
              </Box>
            </>
          )}
        </Stack>
      </Drawer>
    </>
  )
}

export default DashboardPage
