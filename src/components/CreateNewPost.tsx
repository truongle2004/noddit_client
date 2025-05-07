import { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button
} from '@mui/material'
import { DropzoneArea } from 'mui-file-dropzone'
import Editor from '@/components/Editor'
import { CREATE_POST_WITH_OPTION } from '@/constant'

const CreateNewPost = () => {
  const [title, setTitle] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [images, setImages] = useState<File[]>([])
  const [content, setContent] = useState('')
  const [selectedCommnuity, setSelectedCommnunity] = useState('')
  const [option, setOption] = useState(CREATE_POST_WITH_OPTION.TEXT)

  const handleOptionChange = (value: CREATE_POST_WITH_OPTION) => {
    setOption(value)
  }

  const handleAgeChange = (event: SelectChangeEvent) => {
    setSelectedCommnunity(event.target.value)
  }

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', width: '100%', px: 2 }}
    >
      <Stack spacing={3} sx={{ width: '100%', maxWidth: 600 }}>
        <Typography variant="h4">Create post</Typography>

        <FormControl fullWidth>
          <InputLabel id="age-select-label">Age</InputLabel>
          <Select
            labelId="age-select-label"
            id="age-select"
            value={selectedCommnuity}
            label="Commnunity"
            onChange={handleAgeChange}
          >
            <MenuItem value={10}>Neovim</MenuItem>
            <MenuItem value={20}>Golang</MenuItem>
            <MenuItem value={30}>Java</MenuItem>
          </Select>
        </FormControl>

        <Stack direction="row" spacing={2}>
          {Object.values(CREATE_POST_WITH_OPTION).map((opt) => (
            <Button
              key={opt}
              variant={option === opt ? 'contained' : 'outlined'}
              onClick={() => handleOptionChange(opt)}
            >
              {opt.replace('_', ' ')}
            </Button>
          ))}
        </Stack>

        <TextField
          label="Title*"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {option === CREATE_POST_WITH_OPTION.IMAGE_VIDEO && (
          <DropzoneArea onChange={setImages} />
        )}

        {option === CREATE_POST_WITH_OPTION.TEXT && (
          <Editor value={content} onChange={(val: string) => setContent(val)} />
        )}
      </Stack>
    </Box>
  )
}

export default CreateNewPost
