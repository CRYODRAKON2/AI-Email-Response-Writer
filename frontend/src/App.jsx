import { useState } from 'react';
import './App.css';
import axios from "axios";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
  Paper,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme
const theme = createTheme({
  palette: {
    primary: { main: '#4a148c' }, // Deep purple
    secondary: { main: '#ff6f00' }, // Vibrant orange
    background: {
      default: '#f3f4f6', // Light gray background
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h3: {
      fontWeight: 600,
      color: '#4a148c',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  const [emailcontent, SetEmailContent] = useState('');
  const [tone, SetTone] = useState('');
  const [generatedReply, SetGeneratedReply] = useState('');
  const [loading, SetLoading] = useState(false);
  const [error, SetError] = useState('');

  const handleGenerateReply = async () => {
    SetLoading(true);
    SetError('');

    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailcontent,
        tone,
      });

      // ✅ Fix: backend returns plain string, not JSON
      SetGeneratedReply(response.data);

    } catch (error) {
      SetError('Failed to generate email reply. Please try again');
      console.error(error);
    } finally {
      SetLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          bgcolor: 'background.default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
            <Typography variant="h3" component="h1" align="center" gutterBottom>
              Email Reply Generator 📧
            </Typography>

            <Box sx={{ my: 4 }}>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                label="Original Email Content"
                placeholder="Paste the email content here..."
                value={emailcontent}
                onChange={(e) => SetEmailContent(e.target.value)}
                sx={{ mb: 3 }}
              />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="tone-select-label">Tone (Optional)</InputLabel>
                <Select
                  labelId="tone-select-label"
                  label="Tone (Optional)"
                  value={tone}
                  onChange={(e) => SetTone(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="professional">Professional</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="friendly">Friendly</MenuItem>
                  <MenuItem value="formal">Formal</MenuItem>
                  <MenuItem value="concise">Concise</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleGenerateReply}
                disabled={!emailcontent || loading}
                sx={{ py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Reply'}
              </Button>
            </Box>

            {generatedReply && (
              <Box 
                elevation={3} 
                sx={{ mt: 3, p: 3, borderRadius: 3, bgcolor: 'background.paper' }}
              >
                <Typography variant="h6" gutterBottom color="primary">
                  Generated Reply:
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  variant='outlined'
                  value={generatedReply || ''}
                  inputProps={{ readOnly:true }}
                />
              </Box>
            )}

            {error && (
              <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                {error}
              </Typography>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
