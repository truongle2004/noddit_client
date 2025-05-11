import { CreateCommunitySchema } from '@/schema'
import useDashboardStore from '@/store/dashboardStore'
import { ClearSession, ReadSession, WriteSession } from '@/utils/session'
import { zodResolver } from '@hookform/resolvers/zod'
import ImageIcon from '@mui/icons-material/Image'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { useTheme, type Theme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect, useRef, useState, ChangeEvent } from 'react'
import { useForm, Controller } from 'react-hook-form'
import z from 'zod'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import LockIcon from '@mui/icons-material/Lock'
import PublicIcon from '@mui/icons-material/Public'
import GroupIcon from '@mui/icons-material/Group'
import Tooltip from '@mui/material/Tooltip'
import { useMutation, useQuery } from '@tanstack/react-query'
import { addNewCommunityAPI, getListTopicAPI } from '@/services/community'
import type { CreateCommunity } from '@/types'
import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import Chip from '@mui/material/Chip'

const NameKey = 'name_community'
const DescriptionKey = 'description_community'
const TopicKey = 'topic_community'
const PrivacyKey = 'privacy_community'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

function getStyles(
  id: string,
  selectedTopics: readonly string[],
  theme: Theme
) {
  return {
    fontWeight: selectedTopics.includes(id)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular
  }
}

// Enhanced Schema with new fields
const EnhancedCreateCommunitySchema = CreateCommunitySchema.extend({
  topic: z.array(z.string()).min(1, 'At least one topic is required'),
  privacy: z.enum(['public', 'private', 'restricted'])
})

// Types
type FormData = z.infer<typeof EnhancedCreateCommunitySchema>

const ModalCreateCommunity = () => {
  const theme = useTheme()
  const { openModalCreateCommunity, setOpenModalCreateCommunity } =
    useDashboardStore()

  const [indexView, setIndexView] = useState(0)
  const [bannerImage, setBannerImage] = useState<string | null>(null)
  const [iconImage, setIconImage] = useState<string | null>(null)

  const bannerInputRef = useRef<HTMLInputElement | null>(null)
  const iconInputRef = useRef<HTMLInputElement | null>(null)

  const storedName =
    typeof window !== 'undefined' ? ReadSession(NameKey) || '' : ''
  const storedDescription =
    typeof window !== 'undefined' ? ReadSession(DescriptionKey) || '' : ''
  const storedTopics =
    typeof window !== 'undefined' ? ReadSession(TopicKey)?.split(',') || [] : []
  const storedPrivacy =
    typeof window !== 'undefined'
      ? ReadSession(PrivacyKey) || 'public'
      : 'public'

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: storedName,
      description: storedDescription,
      topic: storedTopics,
      privacy: storedPrivacy as 'public' | 'private' | 'restricted'
    },
    resolver: zodResolver(EnhancedCreateCommunitySchema)
  })

  const { mutate: addNewCommunity } = useMutation({
    mutationKey: ['create-community'],
    mutationFn: addNewCommunityAPI,
    onSuccess: (data) => {},
    onError: () => {}
  })

  const handleCancel = () => {
    setOpenModalCreateCommunity(false)
    ClearSession()
  }

  useEffect(() => {
    const subscription = watch((value) => {
      WriteSession(NameKey, value.name || '')
      WriteSession(DescriptionKey, value.description || '')
      if (value.topic) {
        WriteSession(TopicKey, value.topic.join(','))
      }
      WriteSession(PrivacyKey, value.privacy || 'public')
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const onSubmit = (data: FormData) => {
    if (indexView !== 1) {
      setIndexView((prev) => prev + 1)
      return
    }

    const communityData: CreateCommunity = {
      name: data.name,
      description: data.description,
      topic: data.topic,
      type: data.privacy
    }

    const formData = new FormData()
    formData.append('name', communityData.name)
    formData.append('description', communityData.description)
    formData.append('topic', communityData.topic.join(','))
    formData.append('type', communityData.type)
    formData.append('banner_image', bannerImage || '')
    formData.append('icon_image', iconImage || '')
    formData.append('creator_id', '1')
    addNewCommunity(formData)
  }

  const handleBannerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setBannerImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleIconChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setIconImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePrivacyChange = (
    event: React.MouseEvent<HTMLElement>,
    newPrivacy: 'public' | 'private' | 'restricted'
  ) => {
    if (newPrivacy !== null) {
      setValue('privacy', newPrivacy)
    }
  }

  const privacyOptions = [
    {
      value: 'public',
      icon: <PublicIcon />,
      label: 'Public',
      tooltip: 'Anyone can view, post, and comment'
    },
    {
      value: 'restricted',
      icon: <GroupIcon />,
      label: 'Restricted',
      tooltip: 'Anyone can view, but only approved members can post'
    },
    {
      value: 'private',
      icon: <LockIcon />,
      label: 'Private',
      tooltip: 'Only members can view and post'
    }
  ]

  const { data: topics } = useQuery({
    queryKey: ['topic'],
    queryFn: getListTopicAPI,
    enabled: openModalCreateCommunity === true
  })

  return (
    <Modal
      keepMounted
      open={openModalCreateCommunity}
      aria-labelledby="create-community-title"
      aria-describedby="create-community-description"
    >
      <Box sx={theme.custom.modalStyle}>
        <Typography variant="h5" mb={3}>
          Tell us about your community
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Stack direction={'row'} spacing={10}>
              {indexView === 0 && (
                <>
                  <Stack spacing={3} sx={{ width: '100%' }}>
                    <TextField
                      label="Community Name"
                      variant="outlined"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      {...register('name')}
                      fullWidth
                    />

                    <TextField
                      label="Description"
                      multiline
                      rows={4}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      {...register('description')}
                      fullWidth
                    />

                    {/* Topic Selection - Fixed implementation */}
                    <Controller
                      name="topic"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.topic}>
                          <InputLabel id="topic-select-label">
                            Topics
                          </InputLabel>
                          <Select
                            {...field}
                            labelId="topic-select-label"
                            id="topic-select"
                            multiple
                            input={<OutlinedInput label="Topics" />}
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  gap: 0.5
                                }}
                              >
                                {selected.map((topicId) => {
                                  const topic = topics?.data.find(
                                    (t) => t.id === topicId
                                  )
                                  return (
                                    <Chip
                                      key={topicId}
                                      label={topic?.name || topicId}
                                    />
                                  )
                                })}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {topics?.data.map((topic) => (
                              <MenuItem
                                key={topic.id}
                                value={topic.id}
                                style={getStyles(topic.id, field.value, theme)}
                              >
                                {topic.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.topic && (
                            <FormHelperText>
                              {errors.topic.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />

                    {/* Privacy Settings */}
                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight="medium"
                        gutterBottom
                      >
                        Privacy Settings
                      </Typography>
                      <FormControl fullWidth error={!!errors.privacy}>
                        <ToggleButtonGroup
                          value={watch('privacy')}
                          exclusive
                          onChange={handlePrivacyChange}
                          aria-label="community privacy"
                          sx={{
                            width: '100%',
                            '& .MuiToggleButtonGroup-grouped': {
                              flex: 1,
                              justifyContent: 'center'
                            }
                          }}
                        >
                          {privacyOptions.map((option) => (
                            <Tooltip
                              key={option.value}
                              title={option.tooltip}
                              arrow
                            >
                              <ToggleButton
                                value={option.value}
                                aria-label={option.label}
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 1,
                                  py: 1.5
                                }}
                              >
                                {option.icon}
                                <Typography variant="body2">
                                  {option.label}
                                </Typography>
                              </ToggleButton>
                            </Tooltip>
                          ))}
                        </ToggleButtonGroup>
                        {errors.privacy && (
                          <FormHelperText>
                            {errors.privacy.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                  </Stack>
                </>
              )}
            </Stack>

            {/*Banner and Icon Image Section */}
            {indexView === 1 && (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="medium">
                    Banner Image
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button
                      startIcon={<ImageIcon />}
                      variant="outlined"
                      color="primary"
                      onClick={() => bannerInputRef.current?.click()}
                      sx={{
                        borderRadius: 2,
                        padding: '8px 16px',
                        textTransform: 'none'
                      }}
                    >
                      Choose Banner Image
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={bannerInputRef}
                      style={{ display: 'none' }}
                      onChange={handleBannerChange}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {bannerImage ? 'Image selected' : 'No image selected'}
                    </Typography>
                  </Stack>

                  {bannerImage && (
                    <Paper
                      elevation={1}
                      sx={{
                        mt: 1,
                        p: 1,
                        borderRadius: 2,
                        maxWidth: '100%',
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={bannerImage}
                        alt="Banner preview"
                        style={{
                          width: '100%',
                          height: 120,
                          objectFit: 'cover',
                          borderRadius: 8
                        }}
                      />
                    </Paper>
                  )}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="medium">
                    Community Icon
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button
                      startIcon={<ImageIcon />}
                      variant="outlined"
                      color="primary"
                      onClick={() => iconInputRef.current?.click()}
                      sx={{
                        borderRadius: 2,
                        padding: '8px 16px',
                        textTransform: 'none'
                      }}
                    >
                      Choose Icon Image
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={iconInputRef}
                      style={{ display: 'none' }}
                      onChange={handleIconChange}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {iconImage ? 'Image selected' : 'No image selected'}
                    </Typography>
                  </Stack>

                  {iconImage && (
                    <Paper
                      elevation={1}
                      sx={{
                        mt: 1,
                        p: 1,
                        borderRadius: 2,
                        width: 'fit-content',
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={iconImage}
                        alt="Icon preview"
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: 'cover',
                          borderRadius: 8
                        }}
                      />
                    </Paper>
                  )}
                </Box>
              </>
            )}

            <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  borderRadius: 2,
                  padding: '8px 24px',
                  textTransform: 'none'
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: 2,
                  padding: '8px 24px',
                  textTransform: 'none'
                }}
              >
                {indexView === 1 ? 'Submit' : 'Next'}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}

export default ModalCreateCommunity
