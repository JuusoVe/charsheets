import { StyleSheet } from '@react-pdf/renderer'

export const SMALL_TEXT_STYLES = {
  fontSize: 6,
  fontWeight: 400,
}

export const modulesTableStyles = StyleSheet.create({
  table: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'column',
  },
  extraTable: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 12,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 4,
    paddingBottom: 4,
    minHeight: 14,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderBottomStyle: 'solid',
    paddingTop: 2,
    paddingBottom: 2,
    lineHeight: 1.0,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 8,
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 10,
    marginBottom: 8,
    lineHeight: 1.0,
  },
  includesList: {
    marginBottom: 12,
    lineHeight: 0.8,
  },
  includesItem: {
    fontSize: 10,
    marginBottom: 4,
    lineHeight: 0.8,
  },
})
