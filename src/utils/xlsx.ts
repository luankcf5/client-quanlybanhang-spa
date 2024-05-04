import * as XLSX from 'xlsx';

// ----------------------------------------------------------------------

type ExportExcelProps = {
  data: any;
  name: string;
  sheet: string;
  type: string;
};

export const exportToExcel = ({ data, name, sheet, type }: ExportExcelProps) => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, sheet);
  XLSX.writeFile(workbook, `${name}${type}`);
};

export const readExcelFile = async (file: any) => {
  const data = await file?.arrayBuffer();
  const workbook = XLSX.read(data);

  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  return jsonData;
};
