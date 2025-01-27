import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'

async function contestAnalysisToXlsx (contestData) {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Contest-Analysis-trackcode')

  // Add Header Row for the Table
  worksheet.columns = [
    { header: 'Roll No', key: 'rollNo', width: 15 },
    { header: 'Student Name', key: 'studentName', width: 30 },
    { header: 'Branch', key: 'branch', width: 10 },
    { header: 'Year', key: 'year', width: 10 },
    { header: 'Rank', key: 'rank', width: 10 },
    { header: 'Problems Solved', key: 'problemsSolved', width: 20 },
    { header: 'Rating', key: 'rating', width: 10 }
  ]

  const headerRow = worksheet.getRow(1)
  headerRow.font = { bold: true }
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'D3D3D3' } // Grey background for the header
  }
  headerRow.eachCell(cell => {
    cell.border = {
      top: { style: 'thin', color: { argb: '000000' } },
      left: { style: 'thin', color: { argb: '000000' } },
      bottom: { style: 'thin', color: { argb: '000000' } },
      right: { style: 'thin', color: { argb: '000000' } }
    }
  })

  contestData.students.forEach(data => {
    worksheet.addRow({
      rollNo: data.rollNo,
      studentName: data.name,
      branch: data.branch,
      year: data.year,
      rank: data.performance.rank,
      problemsSolved: data.performance.problemsSolved,
      rating: data.performance.rating
    })
  })

  // Save the file
  const buffer = await workbook.xlsx.writeBuffer()
  saveAs(
    new Blob([buffer]),
    `Contest-Analysis-${contestData.contest.contestName}.xlsx`
  )
}

export default contestAnalysisToXlsx
