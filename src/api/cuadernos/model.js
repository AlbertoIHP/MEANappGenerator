import mongoose, { Schema } from 'mongoose'

const cuadernosSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  nombre: {
    type: String
  },
  tipo: {
    type: String
  }
}, {
  timestamps: true
})

cuadernosSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      nombre: this.nombre,
      tipo: this.tipo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Cuadernos', cuadernosSchema)

export const schema = model.schema
export default model
