import axios from "axios";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY; 

// Utility function to fetch task estimate from OpenAI
export const fetchTaskEstimate = async (task) => {
    const prompt = `
    You are an assistant helping a manager to estimate the time to complete tasks. 
    The user is a Director of Product with 7.5 years of experience in product management and 3.5 years at the current company.
    He started as the first product manager at the current company. His company is an internationalization solution with international shipping at its core.
    He is the director for the shipping product. He has 3 PMs and 1 designer reporting directly to him.
    Given the following task details, estimate the time it would take to complete:
  
      Task Name: ${task.name}
      Description: ${task.description}
  
      Please respond only with the estimated time in this format:  
      "Estimated time: X hours"
    `;
  
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 50,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("OpenAI Response:", response.data); // Debug log to inspect response
      const estimate = response.data.choices[0]?.message?.content?.trim();
      console.log("Extracted Estimate:", estimate);
      return estimate || "Estimate not found"; // Fallback
    } catch (error) {
      console.error("Error fetching estimate:", error.response?.data || error.message);
      throw error;
    }
  };
  