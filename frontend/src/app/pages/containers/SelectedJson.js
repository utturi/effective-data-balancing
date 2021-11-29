import { FileTextData } from './UploadImage';

const SelectedJson = () => {
  return <>{FileTextData && FileTextData.json_url}</>;
};

export default SelectedJson;
