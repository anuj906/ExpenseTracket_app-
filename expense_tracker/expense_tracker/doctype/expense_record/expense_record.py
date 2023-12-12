
import frappe
from frappe.model.document import Document

class ExpenseRecord(Document):
	def before_save(self):
		self.formated_amount = self.amount if self.type == "Credit" else (0-self.amount)
		