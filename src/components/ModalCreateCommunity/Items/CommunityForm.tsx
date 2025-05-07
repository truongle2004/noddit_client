import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const NameCommunityKey = 'name_community'
const DescriptionCommunityKey = 'description_community'
const LimitLengthName = 21
const LimitLengthDescription = 500

const schema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(LimitLengthName, { message: 'Name is too long (max 50 characters)' }),

  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(LimitLengthDescription, {
      message: 'Description is too long (max 500 characters)'
    })
})

const CommunityForm = () => {
  const storedName =
    typeof window !== 'undefined'
      ? sessionStorage.getItem(NameCommunityKey) || ''
      : ''

  const storedDescription =
    typeof window !== 'undefined'
      ? sessionStorage.getItem(DescriptionCommunityKey) || ''
      : ''

  const {
    register,
    watch,
    formState: { errors }
  } = useForm<{
    name: string
    description: string
  }>({
    defaultValues: {
      name: storedName,
      description: storedDescription
    },
    resolver: zodResolver(schema)
  })

  const handleSetDataFromSessionStorage = () => {
    sessionStorage.setItem(NameCommunityKey, watch('name'))
    sessionStorage.setItem(DescriptionCommunityKey, watch('description'))
  }

  const DescriptionReview = () => {
    let descripton = watch('description')
    if (descripton.length < 10) return descripton
    else {
      descripton = descripton + '\n'
    }
    return descripton
  }

  useEffect(() => {
    handleSetDataFromSessionStorage()
  }, [watch('name'), watch('description')])

  return (
    <Box>
      <Typography variant="h5" id="create-community-title" gutterBottom>
        Tell us about your community
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        A name and description help people understand what your community is all
        about.
      </Typography>

      <Stack direction="row" spacing={2} mt={2}>
        <Stack spacing={2} flex={1}>
          <TextField
            label="Community Name*"
            variant="outlined"
            helperText={!!errors.name?.message}
            slotProps={{
              htmlInput: {
                maxLength: LimitLengthName
              }
            }}
            error={!!errors.name?.message}
            {...register('name')}
          />
          <Typography>{LimitLengthName - watch('name').length}</Typography>
          <TextField
            label="Description*"
            multiline
            size="small"
            slotProps={{
              htmlInput: {
                maxLength: LimitLengthDescription
              }
            }}
            rows={4}
            variant="outlined"
            {...register('description')}
          />
          <Typography>
            {LimitLengthDescription - watch('description').length}
          </Typography>
        </Stack>
        <Card sx={{ width: 300, wordWrap: 'break-word' }}>
          <CardContent>
            <Typography variant="h6">
              r/{watch('name') || 'your_community'}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              1 member · 1 online
            </Typography>
            <Typography variant="body2" mt={1}>
              {DescriptionReview() ||
                'Your community description will appear here.'}
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}

export default CommunityForm
