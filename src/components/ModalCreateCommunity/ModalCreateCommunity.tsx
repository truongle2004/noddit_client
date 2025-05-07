import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import useDashboardStore from '@/store/dashboardStore'
import CommunityStyle from './Items/CommunityStyle'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import CommunityForm from './Items/CommunityForm'

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const AMOUNT_OF_STEPS = 3

const ModalCreateCommunity = () => {
  const { openModalCreateCommunity, setOpenModalCreateCommunity } =
    useDashboardStore()
  const handleClose = () => setOpenModalCreateCommunity(false)
  const [componentIndex, setComponentIndex] = useState(0)
  const handleBack = () => {
    if (componentIndex > 0) {
      setComponentIndex(componentIndex - 1)
    }
  }
  const handleNext = () => {
    if (componentIndex + 1 > AMOUNT_OF_STEPS) {
      // TODO: handle final step
      // TODO: if it's final step, start to call api create new community
    }
    setComponentIndex(componentIndex + 1)
  }

  return (
    <Modal
      keepMounted
      open={openModalCreateCommunity}
      onClose={handleClose}
      aria-labelledby="create-community-title"
      aria-describedby="create-community-description"
    >
      <Box sx={modalStyle}>
        <Stack>
          {componentIndex === 0 && <CommunityForm />}
          {componentIndex === 1 && <CommunityStyle />}
          <Box>
            <Stack
              direction={'row'}
              spacing={2}
              sx={{
                mt: 2
              }}
              justifyContent={'flex-end'}
            >
              <Button variant="outlined" onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Modal>
  )
}

export default ModalCreateCommunity
