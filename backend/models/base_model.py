from abc import ABC, abstractmethod

# abstract class for all models
class BaseModel(ABC):
  # generate content based on input
  @abstractmethod
  def generate(self, input, input_type, output_type, options):
      pass
